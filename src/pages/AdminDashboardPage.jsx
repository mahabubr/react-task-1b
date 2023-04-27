import React, { useContext, useEffect, useState } from "react";
import MkdSDK from "../utils/MkdSDK";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router";

const AdminDashboardPage = () => {
	const [data, setData] = useState();

	const sdk = new MkdSDK();

	const navigate = useNavigate()

	const { dispatch } = useContext(AuthContext);

	useEffect(() => {
		const data = {
			payload: {},
			page: 1,
			limit: 10,
		};

		async function fetchData() {
			try {
				const res = await sdk.callRestAPI(data, "PAGINATE");
				console.log(res);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);

	const onLogOut = () => {
		dispatch({ type: "LOGOUT" });
		navigate("/admin/login");
	};

	return (
		<>
			<div className='w-full mx-auto bg-black text-white p-16'>
				<div className='flex justify-between items-center'>
					<h1 className='font-bold text-4xl'>APP</h1>
					<div
						onClick={onLogOut}
						className='flex justify-center items-center gap-3 bg-[#9BFF00] text-black py-2 px-4 rounded-2xl'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
							/>
						</svg>
						<button className=''>Log Out</button>
					</div>
				</div>
				<div className='mt-10'>
					<div className='flex justify-between items-center'>
						<h2 className='text-3xl font-thin'>Today’s leaderboard</h2>
						<p className='bg-[#1D1D1D] p-2 rounded-md font-mono text-[#666666]'>
							30 May 2022 •{" "}
							<span className='bg-[#9BFF00] text-black py-1 px-2 rounded-full'>
								Submissions OPEN
							</span>{" "}
							• 11:34
						</p>
					</div>
					<div className='mt-12'>
						<div className='font-thin text-[#acabab] flex justify-between items-center text-md'>
							<p># Title</p>
							<p>Author</p>
							<p>Most Liked</p>
						</div>
						<div className='mt-5'>
							<div className='grid grid-cols-4 place-items-center border-2 p-4 rounded-3xl border-[#1D1D1D]'>
								<div>
									<p>01</p>
								</div>
								<div>
									<p>Image</p>
								</div>
								<div>
									<p>
										Rune raises $100,000 for marketing through NFT butterflies
										sale
									</p>
								</div>
								<div>
									<p>254</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-end items-center gap-4 mt-12">
						<button className='flex justify-center items-center gap-3 bg-[#9BFF00] text-black py-2 px-4 rounded-2xl'>
							Back
						</button>
						<button className='flex justify-center items-center gap-3 bg-[#9BFF00] text-black py-2 px-4 rounded-2xl'>
							Next
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminDashboardPage;
