/* The Couple Challenge result selector. This file is intentionally isolated so a challenge error cannot block the core test. */
(function () {
  'use strict';

  function fits(challenge, results, intensity) {
    if (!challenge || !results) return false;
    if (intensity !== 'surprise' && Array.isArray(challenge.intensity) && challenge.intensity.indexOf(intensity) < 0) return false;
    if (challenge.loveDifference && !results.loveDifferent) return false;
    if (challenge.loveLanguage && results.loveLanguages.indexOf(challenge.loveLanguage) < 0) return false;

    var categories = challenge.applicableResultCategories || ['*'];
    var target = null;
    if (challenge.slot === 'strength') target = results.strongest;
    if (challenge.slot === 'grow') target = results.lowest;
    if (challenge.slot === 'difference') target = results.differenceCategory;
    if (target && categories.indexOf('*') < 0 && categories.indexOf(target) < 0) return false;
    return true;
  }

  function rank(challenge, results, slot, usedMedia) {
    var score = 0;
    if (challenge.slot === slot) score += 8;
    if (challenge.slot === 'any') score += 2;
    if (usedMedia.indexOf(challenge.mediaType) < 0) score += 3;
    if (challenge.loveLanguage && results.loveLanguages.indexOf(challenge.loveLanguage) >= 0) score += 5;
    if (challenge.loveDifference && results.loveDifferent) score += 6;
    return score + Math.random();
  }

  function personalize(challenge, results) {
    var c = Object.assign({}, challenge);
    var names = results.partnerNames[0] + ' and ' + results.partnerNames[1];
    c.instructions = String(c.instructions || '')
      .replace(/\{strength\}/g, results.strongest)
      .replace(/\{growth\}/g, results.lowest)
      .replace(/\{difference\}/g, results.differenceCategory || results.lowest)
      .replace(/\{other\}/g, names);

    if (c.slot === 'strength') {
      c.why = results.strongest + ' was one of your strongest matches (' + results.scores[results.strongest] + '%).';
    } else if (c.slot === 'difference') {
      c.why = 'Your answers showed an interesting difference around ' + (results.differenceCategory || results.lowest) + '.';
    } else if (c.slot === 'grow') {
      c.why = results.lowest + ' is a Growth Opportunity at ' + results.scores[results.lowest] + '%—worth understanding, not judging.';
    } else if (c.loveLanguage) {
      c.why = c.loveLanguage + ' showed up in your love-language results.';
    } else if (c.category === 'JUST FOR FUN') {
      c.why = 'Your results support making room for play, novelty, and shared memories.';
    } else {
      c.why = 'This fits patterns in your combined Couple Check results.';
    }
    return c;
  }

  function choose(results, intensity, count, exclude, slots) {
    var bank = Array.isArray(window.COUPLE_CHALLENGES) ? window.COUPLE_CHALLENGES : [];
    var output = [];
    var usedMedia = [];
    exclude = exclude || [];
    slots = slots || ['strength', 'difference', 'know', 'fun', 'grow'];

    for (var n = 0; n < count; n += 1) {
      var slot = slots[n] || 'any';
      var pool = bank.filter(function (challenge) {
        return exclude.indexOf(challenge.id) < 0 &&
          !output.some(function (item) { return item.id === challenge.id; }) &&
          fits(challenge, results, intensity) &&
          (challenge.slot === slot || challenge.slot === 'any');
      });

      if (!pool.length) {
        pool = bank.filter(function (challenge) {
          return exclude.indexOf(challenge.id) < 0 &&
            !output.some(function (item) { return item.id === challenge.id; }) &&
            fits(challenge, results, 'surprise') &&
            (challenge.slot === slot || challenge.slot === 'any');
        });
      }

      pool.sort(function (a, b) {
        return rank(b, results, slot, usedMedia) - rank(a, results, slot, usedMedia);
      });

      if (pool.length) {
        var selected = personalize(pool[0], results);
        output.push(selected);
        usedMedia.push(selected.mediaType);
      }
    }
    return output;
  }

  window.CoupleChallengeEngine = {
    generate: function (results, intensity) {
      return choose(results, intensity || 'surprise', 5, [], ['strength', 'difference', 'know', 'fun', 'grow']);
    },
    drawAnother: function (results, intensity, exclude) {
      var pick = choose(results, intensity || 'surprise', 1, exclude || [], ['any']);
      if (!pick.length) pick = choose(results, 'surprise', 1, exclude || [], ['any']);
      return pick[0] || null;
    }
  };
}());