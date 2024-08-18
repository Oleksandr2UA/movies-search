import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  box-sizing: border-box;
}

#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

h1, h2, h3 {
  color: #333;
}

h1 {
  font-size: 2.5rem;
  text-align: center;
  animation: fadeInDown 1s ease-in-out;
  margin-bottom: 20px;
}

.header-page-title {
  animation: fadeInDown 1s ease-in-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  margin: 10px 0;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s forwards ease-in-out;
}

.movie-details img {
  transition: transform 0.3s ease;
  animation: slideIn 1s forwards ease-in-out;
}

footer {
  background-color: #3f51b5;
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  margin-top: auto;
}

footer p {
  margin: 0;
}

nav ul {
  list-style: none;
  padding: 0;
  margin-top: 0;
  display: flex;
  justify-content: center;
  background-color: #3f51b5;
}

nav ul li {
  margin: 10px 15px;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
}

main {
  position: relative;
  flex: 1;
  margin: 20px auto;
  max-width: 1200px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

button {
  background-color: #3f51b5;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ff5722;
}

input[type="text"] {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 300px;
  max-width: 100%;
}

.active {
  color: #ff5722;
}

@media (max-width: 768px) {
  footer {
    font-size: 12px;
    padding: 8px 15px;
  }

  nav ul {
    flex-direction: column;
    align-items: center;
  }

  input[type="text"] {
    width: 100%;
  }

  main {
    margin: 10px;
  }
}

@media (min-width: 948px) {
  main {
    width: 900px;
  }
}

ul li a {
  text-decoration: none;
  color: #3f51b5;
  font-size: 18px;
  transition: color 0.3s;
}

ul li a:hover {
  color: #ff5722;
}`;
