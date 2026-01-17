import { useEffect, useState } from "react";

const ViewLesson = () => {
  const [thing, setThing] = useState("")

  useEffect(() => {
    fetch(`/spanish/lessons/nouns_gender.txt`)
      .then(res => res.text())
      .then(data => { console.log(data); setThing(data) })
      .catch(err => err)
  }, [])

  return <div>
    {
      thing.split("\n").map(line => (
        <pre>{line}</pre>
      ))
    }
  </div>
}

export default ViewLesson;
