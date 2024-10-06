import BoardItem from 'components/BoardItem';
import Top3Item from 'components/Top3Item';
import latestBoardListMock from 'mocks/latest-board-list.mock';
import top3BoardListMock from 'mocks/top-3-board-list.mock';
import './App.css';

function App() {
    return (
        <>
            {/* BoardItem */}
            {/* {latestBoardListMock.map((boardListItem) => (
                <BoardItem boardListItem={boardListItem} />
            ))} */}
            {/* Top3Item */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                {top3BoardListMock.map((boardListItem) => (
                    <Top3Item top3ListItem={boardListItem} />
                ))}
            </div>
        </>
    );
}

export default App;
