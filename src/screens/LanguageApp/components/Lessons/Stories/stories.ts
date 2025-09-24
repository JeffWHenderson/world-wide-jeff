import { Story } from "../../../LanguageAppTypes";

export const stories: Story[] = [
    {
        name: "intro lesson",
        sentences: [
            {
                targetLanguage: "Hola todo el mundo.",
                baseLanguage: "Hello World.",
                grammar: {
                    highlight: "todo el mundo",
                    note: "literal: all the world"
                }
            },
            {
                targetLanguage: "Bienbenidos a mi applicacion",
                baseLanguage: "welcome to my app",
                grammar: {
                    highlight: "applicacion",
                    note: "inflection on the i"
                }
            },
            {
                targetLanguage: "soy un enginero",
                baseLanguage: "I'm an engineer",
                grammar: null
            },
        ]
    },
    {
        name: "second Lesson",
        sentences: [
            {
                targetLanguage: `我的朋友
                                我爸爸和妈妈是老师。我是学生。
                                我有一个朋友。她是女人。她叫小月。她很高。
                                今天，我喝水，她喝茶。我说：“你好吗？”
                                她说：“我很好。你好吗？”
                                我说：“我也很好。”
                                她说：“再见！”
                                我说：“再见！”
                                我们都很高兴。`,
                baseLanguage: `My Friend
                            My father and mother are teachers. I am a student.
                            I have a friend. She is a woman. Her name is Xiao Yue. She is very tall.
                            Today, I drink water, she drinks tea. I say: "How are you?"
                            She says: "I am very good. How are you?"
                            I say: "I am also very good."
                            She says: "Goodbye!"
                            I say: "Goodbye!"
                            We are all very happy.`,
                grammar: {
                    highlight: "我是学生",
                    note: "literal: I am some words or something"
                }
            }
        ]
    }
]
