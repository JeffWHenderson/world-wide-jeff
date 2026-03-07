import { renderToString } from 'react-dom/server';
import { WordListItem } from '../components/WordList';

export const buildPrintableFlashcards = (wordList: WordListItem[]) => {
    const printableFlashCards = () => {
        return <html>
            <head><title>World Wide Jeff --  Cut cards on dotted line</title></head><body>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    {
                        wordList.map((phrase: WordListItem) => (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', breakInside: 'avoid', overflow: 'visible !important', pageBreakInside: 'avoid', padding: '5px', width: '150px', height: '80px', border: '1px dotted grey' }}>
                                <div style={{ textAlign: 'center', borderBottom: '1px solid grey', paddingBottom: '10px', paddingTop: '10px' }}>{phrase.target_language}</div>
                                <div style={{ textAlign: 'center', paddingTop: '10px' }}>{phrase.base_language}</div>
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
