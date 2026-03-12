import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewLesson = () => {
  const { language, lessonId } = useParams(); // Maybe use section for better specification?
  const [thing, setThing] = useState("")

  useEffect(() => {
    fetch(`/${language}/lessons/${lessonId}`)
      .then(res => res.text())
      .then(data => { console.log(data); setThing(data) })
      .catch(err => err)
  }, [])

  return <div style={{ marginLeft: '4px', marginRight: '4px' }}>
    <div
      dangerouslySetInnerHTML={{ __html: thing }}
    />
  </div>
}

export default ViewLesson;
