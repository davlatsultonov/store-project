import {Layout} from "./components/layout/Layout.jsx";
import {Card} from "./components/card/Card.jsx";
import {CardGroup} from "./components/card/CardGroup.jsx";
import {CategoryGroup} from "./components/category/CategoryGroup.jsx";
import {CategoryItem} from "./components/category/CategoryItem.jsx";

function App() {
  return <Layout>
    <CategoryGroup>
      <CategoryItem name={'smartphones'} />
    </CategoryGroup>
    <div className='flex gap-2'>
      <div className='w-1/5'>
        Filters
      </div>
      <CardGroup className='flex-1'>
        <Card product={{
          title: 'Iphone',
          description: 'best phone ever',
          thumbnail: 'https://plus.unsplash.com/premium_photo-1691960547805-7143654bd06b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
          price: 1233,
          rating: 4.5
        }} />
      </CardGroup>
    </div>
  </Layout>;
}

export default App;
