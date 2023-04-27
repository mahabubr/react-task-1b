import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { GlobalContext } from "../globalContext";

const AdminLoginPage = () => {
	const schema = yup
		.object({
			email: yup.string().email().required(),
			password: yup.string().required(),
		})
		.required();

	const { dispatch: patch } = React.useContext(GlobalContext);

	const { dispatch } = React.useContext(AuthContext);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		let sdk = new MkdSDK();
		//TODO

		// const formData = {
		// 	email: data.email,
		// 	password: data.password,
		// 	role: "admin",
		// };

		try {
			const res = await sdk.login(data.email, data.password, "admin");

			if (!res.error) {
				localStorage.setItem("role", JSON.stringify(res.role));

				dispatch({
					type: "LOGIN",
					payload: {
						user: res.user_id,
						token: res.token,
						role: res.role,
					},
				});

				navigate("/admin/dashboard");

				patch({
					type: "SNACKBAR",
					payload: { message: "LOGIN SUCCESSFUL" },
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className='w-full max-w-xs mx-auto'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 '>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='email'>
						Email
					</label>
					<input
						type='email'
						placeholder='Email'
						{...register("email")}
						className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
							errors.email?.message ? "border-red-500" : ""
						}`}
					/>
					<p className='text-red-500 text-xs italic'>{errors.email?.message}</p>
				</div>

				<div className='mb-6'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='password'>
						Password
					</label>
					<input
						type='password'
						placeholder='******************'
						{...register("password")}
						className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
							errors.password?.message ? "border-red-500" : ""
						}`}
					/>
					<p className='text-red-500 text-xs italic'>
						{errors.password?.message}
					</p>
				</div>
				<div className='flex items-center justify-between'>
					<input
						type='submit'
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						value='Sign In'
					/>
				</div>
			</form>
		</div>
	);
};

export default AdminLoginPage;
