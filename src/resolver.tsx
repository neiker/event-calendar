export async function resolver(url: string) {
  const response = await fetch(url);
  return response.json();
}
