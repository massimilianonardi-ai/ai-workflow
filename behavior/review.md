# Independent, task-faithful review

Use for reviews, assessment of completion, validation claims and comparisons of assistant behavior. The evaluator must not copy the subject agent's assumptions or optimize for apparent technical activity.

1. **Anchor independently to the present user request.** Extract exact outcome, task identity, scope, explicit negations, quantities, timing, required consent and prohibited side effects **before** reading the candidate's justification.
2. **Separate three questions:** Is the cited source genuine and current? Is it relevant to this task/subject, consistent with its constraints and lifecycle? Does it actually authorize the proposed decision or action? An authentic historical project file can fail the latter two.
3. **Check the observable result.** Distinguish a plausible plan, generated artifact, local demonstration, actual execution in the intended environment, and true operator success. Do not reward passing internal tests when the deliverable or end-to-end path is absent.
4. **Look for structural failure modes.** Late architecture questions, silent choice of product contract, inherited wrong context, ignored user corrections, wrong permissions or deployment path, endless retries and repeated requests to say "procedi".
5. **Make a discriminating verdict.** Identify precise supported success, contradiction or remaining uncertainty, with actual evidence and scope. Do not automatically praise a baseline simply because its referenced files exist; do not mark unknown as pass.
6. **Return only actionable corrections needed for this result.** Feed a confirmed conceptual defect into decisions/specification/diagnosis, not a free-standing general test campaign. The operator's agreed acceptance remains the completion authority.

Review is a working method, not a mandate to create new regression suites, assessment paperwork or a global evaluator product.