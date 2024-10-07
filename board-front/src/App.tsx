import BoardItem from 'components/BoardItem';
import CommentItem from 'components/CommentItem';
import FavoriteItem from 'components/FavoriteItem';
import Top3Item from 'components/Top3Item';
import commentListMock from 'mocks/comment-list.mock';
import favoriteListMock from 'mocks/favorite-list.mock';
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
            {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                {top3BoardListMock.map((boardListItem) => (
                    <Top3Item top3ListItem={boardListItem} />
                ))}
            </div> */}
            {/* CommentItem */}
            {/* <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {commentListMock.map((commentListItem) => (
                    <CommentItem commentListItem={commentListItem} />
                ))}
            </div> */}
            {/* CommentItem */}
            <div style={{ display: 'flex', columnGap: '30px', rowGap: '20px' }}>
                {favoriteListMock.map((favoriteListItem) => (
                    <FavoriteItem favoriteListItem={favoriteListItem} />
                ))}
            </div>
        </>
    );
}

export default App;
