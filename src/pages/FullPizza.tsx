import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://63ce8f34d2e8c29a9bda01e9.mockapi.io/products/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }

    fetchPizza();
    //was empty
  }, [id, navigate]);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" height={400} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} грн</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
