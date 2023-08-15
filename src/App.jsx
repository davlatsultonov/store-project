import {Layout} from "./components/layout/Layout.jsx";
import {Card} from "./components/card/Card.jsx";
import {CardGroup} from "./components/card/CardGroup.jsx";
import {CategoryGroup} from "./components/category/CategoryGroup.jsx";
import {CategoryItem} from "./components/category/CategoryItem.jsx";
import {FilterGroup} from "./components/filters/FilterGroup.jsx";
import {BlockWrapper} from "./components/layout/BlockWrapper.jsx";
import {FilterItem} from "./components/filters/FilterItem.jsx";
import {FilterPrice} from "./components/filters/FilterPrice.jsx";
import {FilterSelect} from "./components/filters/FilterSelect.jsx";

function App() {
  return <Layout>
    <BlockWrapper className='mb-3'>
      <CategoryGroup>
        <CategoryItem name={'smartphones'} />
      </CategoryGroup>
    </BlockWrapper>
    <div className='flex gap-2'>
      <div className='w-1/4'>
        <BlockWrapper>
          <FilterGroup>
            <FilterItem
              label={'Price'}
            >
              <FilterPrice />
            </FilterItem>
            <FilterItem
              label={'Brand'}
            >
              <FilterSelect />
            </FilterItem>
          </FilterGroup>
        </BlockWrapper>
      </div>
      <BlockWrapper>
        <CardGroup className='flex-1'>
          <Card product={{
            title: 'Iphone',
            description: 'best phone ever',
            thumbnail: 'https://plus.unsplash.com/premium_photo-1691960547805-7143654bd06b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
            price: 1233,
            rating: 4.5
          }} />
        </CardGroup>
      </BlockWrapper>
    </div>
  </Layout>;
}

export default App;
