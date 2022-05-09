const commandIdentifiers: Fig.Generator = {
  custom: async (tokens, executeShellCommand) => {
    const helpText = await executeShellCommand("./flow help");
    const matches = Array.from(helpText.matchAll(/\s+([\w:]+)\s+([\w\s]+)$/gm));
    return [...matches].map((match) => {
      return {
        name: match[1],
        description: match[2].replace(/[\s\n]+/gm, " "),
      };
    });
  },

  // cache: {
  //   ttl: 1000 * 60 * 60 * 24 * 3, // 3 days
  //   cacheByDirectory: true,
  // },
};

const completionSpec: Fig.Spec = {
  name: "flow",
  description: "",
  options: [
    {
      name: "help",
      description: "Show help for neosflow",
    },
  ],
  args: {
    name: "commandIdentifier",
    description: "The command you want to run",
    isOptional: true,
    generators: commandIdentifiers,
  },
};
export default completionSpec;
