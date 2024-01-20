import React, { useEffect, useState } from "react";
import "./Todo.css";

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setinputValue] = useState("");

	const handleAddTodo = () => {
		if (inputValue.trim() !== "") {
			setTodos([...todos, { text: inputValue, completed: false }]);
			setinputValue("");
		}
	};

	const handleInputChange = (e) => {
		setinputValue(e.target.value);
	};

	const handleToggleComplete = (index) => {
		const updatedTodos = [...todos];
		updatedTodos[index].completed = !updatedTodos[index].completed;
		setTodos(updatedTodos);
	};

	const handleDeleteTodo = (index) => {
		const updatedTodos = todos.filter((_, i) => i !== index);
		setTodos(updatedTodos);
	};

	const clearAll = () => {
		setTodos([]);
	};

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
		setTodos(storedTodos);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			localStorage.setItem("todos", JSON.stringify(todos));
		});
	}, [todos]);

	return (
		<>
			<h1 className="text-center">Todo App</h1>
			<div className="todo-container">
				<div className="input-container">
					<input
						type="text"
						placeholder="Enter your text here..."
						className="input-field"
						value={inputValue}
						onChange={handleInputChange}
					/>
					<button type="submit" className="submit-btn" onClick={handleAddTodo}>
						ADD +
					</button>
				</div>
				<div className="list-container">
					{todos.length === 0 ? (
						<h2>You have no todos....</h2>
					) : (
						<ul>
							{todos.map((todo, index) => (
								<li>
									<div className="checkbox-field">
										<input
											type="checkbox"
											checked={todo.completed}
											onChange={() => handleToggleComplete(index)}
										/>
										<span
											style={{
												textDecoration: todo.completed
													? "line-through"
													: "none",
											}}
										>
											{todo.text}
										</span>
									</div>
									<div>
										<button
											onClick={() => handleDeleteTodo(index)}
											className="delete-btn"
										>
											Delete
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="clear-btn">
					<button
						onClick={() => {
							clearAll();
						}}
						className="clear-all-btn"
					>
						Clear All
					</button>
				</div>
			</div>
		</>
	);
};

export default Todo;
