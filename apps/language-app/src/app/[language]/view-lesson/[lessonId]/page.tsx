'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ViewLesson = () => {
    const { language, lessonId } = useParams<{ language: string; lessonId: string }>();
    const [lessonHTML, setLessonHTML] = useState("")

    useEffect(() => {
        fetch(`/${language}/lessons/${lessonId}.html`)
            .then(res => res.text())
            .then(data => { console.log(data); setLessonHTML(data) })
            .catch(err => console.error(err))
    }, [])

    return <div style={{ marginLeft: '4px', marginRight: '4px' }}>
        <div dangerouslySetInnerHTML={{ __html: lessonHTML }} />
    </div>
}

export default ViewLesson;
