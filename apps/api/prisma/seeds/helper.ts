export async function runSeed(
  name: string,
  action: () => Promise<number>
): Promise<void> {
  console.log(`🌱 Seeding ${name}...`);

  const startedAt = performance.now();

  const count = await action();

  const duration = Math.round(performance.now() - startedAt);

  console.log(
    `✅ ${name}: ${count} record(s) seeded in ${duration}ms`
  );
}