export type ThemeColors = {
    primary: string;
    planMode: string;
    selection: string;
    thinking: string;
    success: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    dialogSurface: string;
    thinkingBorder: string;
    dimSeparator: string;
};

export type Theme = {
    name: string;
    colors: ThemeColors;
};

export const THEMES: Theme[] = [
    {
        name: "Eldritch Void",
        colors: {
            primary: "#00FF9D",      // Toxic neon green
            planMode: "#9D00FF",     // Aggressive violet
            selection: "#5E0099",
            thinking: "#9D00FF",
            success: "#B4FF00",
            error: "#FF0040",
            info: "#00E5FF",
            background: "#05000A",   // Almost black violet
            surface: "#10001A",
            dialogSurface: "#020005",
            thinkingBorder: "#2E004D",
            dimSeparator: "#4D0080",
        },
    },
    {
        name: "Copper Patina",
        colors: {
            primary: "#E2825C",      // Polished copper
            planMode: "#52C4A7",     // Verdigris/Oxidized green
            selection: "#34826F",
            thinking: "#52C4A7",
            success: "#7CB342",
            error: "#D84339",
            info: "#4DD0E1",
            background: "#101213",   // Tarnished dark iron
            surface: "#1C1F21",
            dialogSurface: "#090A0B",
            thinkingBorder: "#2B3336",
            dimSeparator: "#445055",
        },
    },
    {
        name: "Abyssal Trench",
        colors: {
            primary: "#FF006E",      // Bioluminescent pink
            planMode: "#00F3B9",     // Deep sea aqua
            selection: "#005F80",
            thinking: "#00F3B9",
            success: "#39FF14",
            error: "#FF3860",
            info: "#00B4D8",
            background: "#03070C",   // Crushing pressure navy
            surface: "#0B1320",
            dialogSurface: "#010305",
            thinkingBorder: "#182C45",
            dimSeparator: "#213955",
        },
    },
    {
        name: "Neon Syndicate",
        colors: {
            primary: "#FEE715",      // Cyberpunk yellow
            planMode: "#F90093",     // Synth magenta
            selection: "#7A004B",
            thinking: "#F90093",
            success: "#00FFA3",
            error: "#FF003C",
            info: "#00F0FF",
            background: "#090A0F",   // Smog grey/black
            surface: "#151722",
            dialogSurface: "#040508",
            thinkingBorder: "#2C314A",
            dimSeparator: "#3F4666",
        },
    },
    {
        name: "Matcha Noir",
        colors: {
            primary: "#A6C78B",      // Soft matcha green
            planMode: "#EBE2C9",     // Creamy latte
            selection: "#4A6146",
            thinking: "#EBE2C9",
            success: "#89A87C",
            error: "#D96C6C",
            info: "#8BBAC7",
            background: "#161B15",   // Dark roasted olive
            surface: "#21291F",
            dialogSurface: "#10130F",
            thinkingBorder: "#344231",
            dimSeparator: "#4C5E48",
        },
    },
    {
        name: "Velvet Royal",
        colors: {
            primary: "#D4AF37",      // Metallic gold
            planMode: "#D66BB4",     // Plush magenta
            selection: "#702A5A",
            thinking: "#D66BB4",
            success: "#50C878",
            error: "#E63946",
            info: "#8ECAE6",
            background: "#150A1C",   // Deep plum
            surface: "#23122E",
            dialogSurface: "#0D0512",
            thinkingBorder: "#412157",
            dimSeparator: "#5C357A",
        },
    },
    {
        name: "Lunar Dust",
        colors: {
            primary: "#E0E0E0",      // Moonlit white
            planMode: "#A096AA",     // Dusty lavender
            selection: "#46424D",
            thinking: "#A096AA",
            success: "#85A392",
            error: "#B57A7A",
            info: "#8699A6",
            background: "#121212",   // Space grey
            surface: "#1E1E1E",
            dialogSurface: "#0A0A0A",
            thinkingBorder: "#333333",
            dimSeparator: "#4D4D4D",
        },
    },
    {
        name: "Crimson Forge",
        colors: {
            primary: "#FF5722",      // Glowing ember
            planMode: "#FFEB3B",     // White hot heat
            selection: "#802200",
            thinking: "#FFEB3B",
            success: "#00E676",
            error: "#FF1744",
            info: "#03A9F4",
            background: "#0F0202",   // Charred black
            surface: "#1A0505",
            dialogSurface: "#050000",
            thinkingBorder: "#380D0D",
            dimSeparator: "#5C1414",
        },
    },
    {
        name: "Aurora",
        colors: {
            primary: "#00FF9D",      // Northern lights green
            planMode: "#9D4EDD",     // High atmospheric purple
            selection: "#4E2175",
            thinking: "#9D4EDD",
            success: "#48BFE3",
            error: "#F72585",
            info: "#00B4D8",
            background: "#001219",   // Night sky teal
            surface: "#00222B",
            dialogSurface: "#000A0E",
            thinkingBorder: "#004759",
            dimSeparator: "#006C87",
        },
    },
    {
        name: "Autumn Canvas",
        colors: {
            primary: "#E07A5F",      // Burnt orange
            planMode: "#F2CC8F",     // Warm mustard
            selection: "#A67A5B",
            thinking: "#F2CC8F",
            success: "#81B29A",
            error: "#D9534F",
            info: "#5C9EAD",
            background: "#221813",   // Rich soil brown
            surface: "#31231C",
            dialogSurface: "#17100D",
            thinkingBorder: "#523B2F",
            dimSeparator: "#735444",
        },
    },
    {
        name: "Glacial Rift",
        colors: {
            primary: "#82C0FF",      // Frostbite blue
            planMode: "#E6F0FA",     // Snow white
            selection: "#4B7EB0",    // Deep glacier ice
            thinking: "#E6F0FA",
            success: "#00E5C0",      // Minty ice
            error: "#FF6B8B",        // Cold pink
            info: "#A0D2FF",
            background: "#0A141E",   // Sub-zero ocean depth
            surface: "#142333",      // Ice cave wall
            dialogSurface: "#0D1926",
            thinkingBorder: "#284566",
            dimSeparator: "#3B5A7A",
        },
    },
    {
        name: "Mycelium Glow",
        colors: {
            primary: "#D6A3FF",      // Glowing purple mushroom
            planMode: "#00E5FF",     // Bioluminescent cyan
            selection: "#2B593F",    // Damp moss
            thinking: "#00E5FF",
            success: "#A8FF78",      // Bright toxic spore
            error: "#FF4A7A",        // Poison berry
            info: "#78C0FF",
            background: "#0B120C",   // Deep midnight forest
            surface: "#131C15",      // Dark wood bark
            dialogSurface: "#0D160F",
            thinkingBorder: "#213326",
            dimSeparator: "#314A38",
        },
    },
    {
        name: "Dune Spice",
        colors: {
            primary: "#FF9D00",      // Raw glowing spice
            planMode: "#FFD166",     // Bleached sun
            selection: "#A35C1A",    // Terracotta sand
            thinking: "#FFD166",
            success: "#7DBA69",      // Oasis green
            error: "#E63946",        // Sunburn red
            info: "#F4A261",
            background: "#1A110A",   // Deep canyon shadow
            surface: "#2B1D14",      // Baked earth
            dialogSurface: "#1E140C",
            thinkingBorder: "#4A3324",
            dimSeparator: "#664A38",
        },
    },
    {
        name: "Bismuth Crystal",
        colors: {
            primary: "#FF5E8E",      // Iridescent pink
            planMode: "#00D0FF",     // Refracted cyan
            selection: "#5D3A9B",    // Deep metallic purple
            thinking: "#00D0FF",
            success: "#00FF9D",      // Crystal green
            error: "#FF1E1E",        // Fractured red
            info: "#FFD000",         // Gold tinge
            background: "#120E1A",   // Dark oxidized metal
            surface: "#1E1729",      // Heavy geometric shadow
            dialogSurface: "#161120",
            thinkingBorder: "#3A2D4D",
            dimSeparator: "#564573",
        },
    }
];

export const DEFAULT_THEME = THEMES.find((t) => t.name === "Neon Syndicate")!;