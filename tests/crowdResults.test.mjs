import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateD20CrowdResult,
  calculateDaggerheartCrowdResult,
  getDaggerheartTone,
  isValidD20,
  isValidDaggerheartDie,
} from "../src/app/_lib/crowdResults.ts";

test("calculates d20 aggregation", () => {
  const result = calculateD20CrowdResult([16, 16, 14, 13]);

  assert.equal(result?.totalRolls, 4);
  assert.equal(result?.roundedAverage, 15);
  assert.equal(result?.nat20s, 0);
  assert.equal(result?.nat1s, 0);
  assert.equal(result?.critType, "normal");
});

test("calculates Daggerheart Hope outcome", () => {
  const result = calculateDaggerheartCrowdResult([
    { hopeDie: 9, fearDie: 4 },
    { hopeDie: 7, fearDie: 5 },
    { hopeDie: 3, fearDie: 8 },
  ]);

  assert.equal(result?.roundedHope, 6);
  assert.equal(result?.roundedFear, 6);
  assert.equal(result?.roundedTotal, 12);
  assert.equal(result?.hopeDominantCount, 2);
  assert.equal(result?.finalTone, "hope");
});

test("calculates Daggerheart Fear outcome", () => {
  const result = calculateDaggerheartCrowdResult([
    { hopeDie: 4, fearDie: 9 },
    { hopeDie: 5, fearDie: 7 },
    { hopeDie: 8, fearDie: 3 },
  ]);

  assert.equal(result?.fearDominantCount, 2);
  assert.equal(result?.finalTone, "fear");
});

test("detects individual Daggerheart Critical from matching dice", () => {
  assert.equal(getDaggerheartTone(6, 6), "critical");
});

test("calculates Daggerheart Critical crowd outcome", () => {
  const result = calculateDaggerheartCrowdResult([
    { hopeDie: 4, fearDie: 4 },
    { hopeDie: 8, fearDie: 8 },
    { hopeDie: 9, fearDie: 2 },
  ]);

  assert.equal(result?.criticalCount, 2);
  assert.equal(result?.finalTone, "critical");
});

test("calculates Daggerheart Mixed outcome from tied plurality", () => {
  const result = calculateDaggerheartCrowdResult([
    { hopeDie: 9, fearDie: 2 },
    { hopeDie: 2, fearDie: 9 },
  ]);

  assert.equal(result?.hopeDominantCount, 1);
  assert.equal(result?.fearDominantCount, 1);
  assert.equal(result?.finalTone, "mixed");
});

test("validates die ranges", () => {
  assert.equal(isValidD20(1), true);
  assert.equal(isValidD20(20), true);
  assert.equal(isValidD20(0), false);
  assert.equal(isValidD20(21), false);
  assert.equal(isValidDaggerheartDie(1), true);
  assert.equal(isValidDaggerheartDie(12), true);
  assert.equal(isValidDaggerheartDie(13), false);
});
