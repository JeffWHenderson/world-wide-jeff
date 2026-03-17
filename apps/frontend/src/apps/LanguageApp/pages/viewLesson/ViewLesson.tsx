import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewLesson = () => {
  const { language, lessonId } = useParams(); // Maybe use section for better specification?
  const [lessonHTML, setLessonHTML] = useState("")

  useEffect(() => {
    fetch(`/${language}/lessons/${lessonId}.html`)
      .then(res => res.text())
      .then(data => { console.log(data); setLessonHTML(data) })
      .catch(err => err)
  }, [])

  return <div style={{ marginLeft: '4px', marginRight: '4px' }}>
    <div
      dangerouslySetInnerHTML={{ __html: lessonHTML }}
    />
  </div>
}

export default ViewLesson;
