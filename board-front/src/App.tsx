import BoardItem from 'components/BoardItem';
import latestBoardListMock from 'mocks/latest-board-list.mock';
import './App.css';

function App() {
    return (
        <>
            {latestBoardListMock.map((boardListItem) => (
                <BoardItem boardListItem={boardListItem} />
            ))}
        </>
    );
}

export default App;
