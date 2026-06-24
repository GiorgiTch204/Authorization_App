export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return new Response("All fields are required", { status: 400 });
    }

    if (password.length < 6) {
      return new Response("Password must be at least 6 characters long", {
        status: 400,
      });
    }

    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Registration failed";
      return new Response(errorMessage, { status: response.status });
    }

    const data = await response.json();

    return Response.json({ id: data.id, username: data.username, email: data.email });
  } catch (reason) {
    return new Response("Invalid request", { status: 400 });
  }
}