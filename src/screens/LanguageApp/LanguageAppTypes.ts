export type Expression = {
    targetLanguage: string;
    baseLanguage: string;
    grammar?: any;  // TODO: type
}

export type Story = {
    name: string;
    sentences: Expression[];
}
