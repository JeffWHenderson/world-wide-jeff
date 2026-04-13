import { renderToString } from 'react-dom/server';
import { WordListItem } from '../pages/wordlist/WordList';

export const buildPrintableFlashcards = (wordList: WordListItem[]) => {
    const printableFlashCards = () => {
        return <html>
            <head>
                <title>World Wide Jeff --  Cut cards on dotted line</title>
            </head>
            <body style={{ margin: '0' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    {
                        wordList.map((phrase: WordListItem) => (
                            <div style={{ display: 'flex', flexDirection: 'column', breakInside: 'avoid', pageBreakInside: 'avoid', width: '230px', height: '110px', border: '1px dotted grey' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', height: '50%', borderBottom: '1px solid grey' }}>
                                    {phrase.romanized ? <div>{phrase.romanized}</div> : null}
                                    <b>{phrase.target_language}</b>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', height: '50%' }}>
                                    <b>{phrase.base_language}</b>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </body>
        </html>
    }

    var printWindow = window.open('', '_blank');
    // The render to string thing below is pretty sick
    printWindow?.document.write(renderToString(printableFlashCards()));
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
    printWindow?.close();
}
