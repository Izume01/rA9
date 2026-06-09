import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import RootLayout from "./layout/rootlayout";
import { Home } from "./screens/home";
import { NewSession } from "./screens/new-session";
import { Session } from "./screens/session";

const renderer = await createCliRenderer({ exitOnCtrlC: false });
const root = createRoot(renderer);

const cleanup = async () => {
    try {
        root.unmount();
        renderer.destroy();
    } catch (error) {
    }
};

const cleanExit = async () => {
    await cleanup();
    process.exit(0);
};

process.on('SIGTERM', async () => {
    await cleanExit();
});

const router = createMemoryRouter([
    {
        path: "/",
        element: <RootLayout onExit={cleanExit} />,
        children: [
            { index: true, element: <Home /> },
            { path: "sessions/new", element: <NewSession /> },
            { path: "sessions/:id", element: <Session /> },
        ]
    }
]);

root.render(
    <RouterProvider router={router} />
);
