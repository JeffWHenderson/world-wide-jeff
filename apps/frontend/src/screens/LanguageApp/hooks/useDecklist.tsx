

const useDecklist = () => {
    const getMyDeck = () => {
        return [{
            "name": "My Deck",
            "type": "flashcards",
            "filename": 'myDeck',
            "sentences": [
                { "base_language": "test", "target_language": "el testing" }
            ]
        }]
    }

    console.log("rendering")
    // const addToDeck = (sentence: any) => {
    //     const deck = getMyDeck()

    //     deck.sentences.push(sentence)
    // }

    return [getMyDeck]
};

export default useDecklist;