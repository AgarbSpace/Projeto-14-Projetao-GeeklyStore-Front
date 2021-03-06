import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Category from './Category'
import Product from './Product'
import { Categories, CategoryList, Products, ProductsList, Footer } from './HomeStyle'
import categoriesData from '../../dates/categoriesData'
import api from '../../services/api'
import Container from '../GlobalStyled/Container'
import { Rings } from 'react-loader-spinner'

export default function HomePage({ token, setToken }){

    const [ allProducts, setAllProducts ] = useState([]);

    async function loadProducts() {
        try {
            const products = await api.getProducts();
            setAllProducts(products)
        } catch(error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        loadProducts();
    },[])

    if(allProducts.length === 0){
        return (
            <Container>
                <Rings color="#D4CFCC" height={200} width={200}/>
            </Container>
        )
    }

    return(
        <>
        <Header setToken={setToken}></Header>

        <Categories>
            <h2>Categorias</h2>
            <CategoryList>
                <li>
                    {categoriesData.map(category => <Category key={category.name} category={category}/>)}
                </li>
            </CategoryList>
        </Categories>

        <Products>
            <h2>Loja</h2>
            <ProductsList>
                {allProducts.map(product => <Product key={product._id} product={product} token={token} />)}
            </ProductsList>
        </Products>

        <Footer>GeeklyStore Corporation</Footer>
        </>
    )
}
