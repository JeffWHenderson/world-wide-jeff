import { readFile, readdir } from "fs/promises";
import path from "path";
import { WordListItem } from "@/types/WordListTypes";
import WordListClient from "./WordListClient";

type Props = {
    params: Promise<{ language: string; section: string; lessonId: string }>;
}

export const generateStaticParams = async () => {
    const contentDir = path.join(process.cwd(), "content");
    const languages = await readdir(contentDir);

    const params = await Promise.all(
        languages.map(async (language) => {
            const modulesDir = path.join(contentDir, language, "modules");
            const sections = await readdir(modulesDir).catch(() => []);
            return sections.map((section) => ({ language, section, lessonId: "__wordList__" }));
        })
    );

    return params.flat();
};

const WordList = async ({ params }: Props) => {
    const { language, section, lessonId } = await params;
    const filePath = path.join(process.cwd(), "content", language, "modules", section, `${lessonId}.json`);
    const wordList: WordListItem[] = await readFile(filePath, "utf-8")
        .then(JSON.parse)
        .catch(() => []);

    return <WordListClient wordList={wordList} language={language} section={section} />;
}

export default WordList;
