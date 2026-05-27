import { Command } from "commander"
import { runAgent } from "@repo/core"

const program = new Command()

program
  .name("agent")
  .description("My Agentic CLI")

program
  .command("chat")
  .argument("<prompt>")
  .action(async (prompt) => {
    console.log("Agent thinking...")
    const response = await runAgent(prompt)
    console.log(response)
  })

program.parse()