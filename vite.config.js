import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var command = _a.command;
    return ({
        // GitHub Pages serves the site from /idle-fight/
        base: command === "build" ? "/idle-fight/" : "/",
        plugins: [react()],
        server: {
            port: 5173,
            open: true,
        },
    });
});
