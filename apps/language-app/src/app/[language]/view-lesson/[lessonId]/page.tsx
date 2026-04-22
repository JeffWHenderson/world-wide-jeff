import { readFile, readdir } from "fs/promises";
import path from "path";

type Props = {
    params: Promise<{ language: string; lessonId: string }>;
}

export const generateStaticParams = async () => {
    const publicDir = path.join(process.cwd(), "content");
    const languages = await readdir(publicDir);

    const params = await Promise.all(
        languages.map(async (language) => {
            const lessonsDir = path.join(publicDir, language, "lessons");
            const files = await readdir(lessonsDir).catch(() => []);
            return files
                .filter((f) => f.endsWith(".html"))
                .map((f) => ({ language, lessonId: f.replace(".html", "") }));
        })
    );

    return params.flat();
};

const ViewLesson = async ({ params }: Props) => {
    const { language, lessonId } = await params;
    const filePath = path.join(process.cwd(), "content", language, "lessons", `${lessonId}.html`);
    const lessonHTML = await readFile(filePath, "utf-8").catch(() => "<p>Lesson not found.</p>");

    return (
        <div style={{ marginLeft: '4px', marginRight: '4px' }}>
            <div dangerouslySetInnerHTML={{ __html: lessonHTML }} />
        </div>
    );
}

export default ViewLesson;
