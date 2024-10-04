import './list.scss';
import Card from '../card/Card.jsx'
import { listData } from '../../lib/fakeData.js'
function List({ posts }) {
    return (
        <div className='list'>
            {posts.map((item) => {
                return (
                    <Card key={item.id} item={item}></Card>
                )
            })}
        </div>
    );
}

export default List;