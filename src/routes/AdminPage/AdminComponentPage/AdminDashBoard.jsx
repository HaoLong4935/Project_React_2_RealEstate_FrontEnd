import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import apiReq from '../../../lib/apiRequest'
import axios from 'axios';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { MdOnlinePrediction } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { AiFillLike } from "react-icons/ai";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Link } from 'react-router-dom'
import { getOrderStatus } from '../lib/helpers'
import classNames from 'classnames'
import { format } from 'date-fns'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const AdminDashBoard = (props) => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userCount, setUserCount] = useState(80);

    const recentOrderData = [
        {
            id: '1',
            product_id: '4324',
            customer_id: '23143',
            customer_name: 'Shirley A. Lape',
            order_date: '2022-05-17T03:24:00',
            order_total: '$435.50',
            current_order_status: 'PLACED',
            shipment_address: 'Cottage Grove, OR 97424'
        },
        {
            id: '7',
            product_id: '7453',
            customer_id: '96453',
            customer_name: 'Ryan Carroll',
            order_date: '2022-05-14T05:24:00',
            order_total: '$96.35',
            current_order_status: 'CONFIRMED',
            shipment_address: 'Los Angeles, CA 90017'
        },
        {
            id: '2',
            product_id: '5434',
            customer_id: '65345',
            customer_name: 'Mason Nash',
            order_date: '2022-05-17T07:14:00',
            order_total: '$836.44',
            current_order_status: 'SHIPPED',
            shipment_address: 'Westminster, CA 92683'
        },
        {
            id: '3',
            product_id: '9854',
            customer_id: '87832',
            customer_name: 'Luke Parkin',
            order_date: '2022-05-16T12:40:00',
            order_total: '$334.50',
            current_order_status: 'SHIPPED',
            shipment_address: 'San Mateo, CA 94403'
        },
        {
            id: '4',
            product_id: '8763',
            customer_id: '09832',
            customer_name: 'Anthony Fry',
            order_date: '2022-05-14T03:24:00',
            order_total: '$876.00',
            current_order_status: 'OUT_FOR_DELIVERY',
            shipment_address: 'San Mateo, CA 94403'
        },
        {
            id: '5',
            product_id: '5627',
            customer_id: '97632',
            customer_name: 'Ryan Carroll',
            order_date: '2022-05-14T05:24:00',
            order_total: '$96.35',
            current_order_status: 'DELIVERED',
            shipment_address: 'Los Angeles, CA 90017'
        }
    ]

    const popularProducts = [
        {
            id: '3432',
            product_name: 'Macbook M1 Pro 14"',
            product_thumbnail: 'https://source.unsplash.com/100x100?macbook',
            product_price: '$1499.00',
            product_stock: 341
        },
        {
            id: '7633',
            product_name: 'Samsung Galaxy Buds 2',
            product_thumbnail: 'https://source.unsplash.com/100x100?earbuds',
            product_price: '$399.00',
            product_stock: 24
        },
        {
            id: '6534',
            product_name: 'Asus Zenbook Pro',
            product_thumbnail: 'https://source.unsplash.com/100x100?laptop',
            product_price: '$899.00',
            product_stock: 56
        },
        {
            id: '9234',
            product_name: 'LG Flex Canvas',
            product_thumbnail: 'https://source.unsplash.com/100x100?smartphone',
            product_price: '$499.00',
            product_stock: 98
        },
        {
            id: '4314',
            product_name: 'Apple Magic Touchpad',
            product_thumbnail: 'https://source.unsplash.com/100x100?touchpad',
            product_price: '$699.00',
            product_stock: 0
        },
        {
            id: '4342',
            product_name: 'Nothing Earbuds One',
            product_thumbnail: 'https://source.unsplash.com/100x100?earphone',
            product_price: '$399.00',
            product_stock: 453
        }
    ]

    const data2 = [
        { name: 'Buy', value: 340 },
        { name: 'Rent', value: 720 },
    ]

    const data4 = 75;
    const doanhThuHienTai = 7500000;
    const doanhThuCanDat = 10000000;

    const RADIAN = Math.PI / 180
    const COLORS = ['#00C49F', '#FFBB28', '#FF8042']

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    const data = [
        {
            name: 'Jan',
            Expense: 4000,
            Income: 2400
        },
        {
            name: 'Feb',
            Expense: 3000,
            Income: 1398
        },
        {
            name: 'Mar',
            Expense: 2000,
            Income: 9800
        },
        {
            name: 'Apr',
            Expense: 2780,
            Income: 3908
        },
        {
            name: 'May',
            Expense: 1890,
            Income: 4800
        },
        {
            name: 'Jun',
            Expense: 2390,
            Income: 3800
        },
        {
            name: 'July',
            Expense: 3490,
            Income: 4300
        },
        {
            name: 'Aug',
            Expense: 2000,
            Income: 9800
        },
        {
            name: 'Sep',
            Expense: 2780,
            Income: 3908
        },
        {
            name: 'Oct',
            Expense: 1890,
            Income: 4800
        },
        {
            name: 'Nov',
            Expense: 2390,
            Income: 3800
        },
        {
            name: 'Dec',
            Expense: 3490,
            Income: 4300
        }
    ]


    useEffect(() => {
        // Gọi API getPosts khi component được render
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8800/api/posts');
                setPosts(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8800/api/users');
                setUsers(response.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUsers()
        fetchPosts();

        const interval = setInterval(() => {
            const randomChange = Math.floor(Math.random() * 3) - 1;
            setUserCount((prevCount) => Math.max(prevCount + randomChange, 0));
        }, 2000);
        return () => clearInterval(interval);

    }, []);
    console.log(posts);
    console.log(users);

    return (
        <>
            <div className="grid gap-4 p-3 grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-400">
                        <MdOnlinePrediction className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Users Online</span>
                        <div className="flex items-center">
                            {/* Trả về tổng số lượng người dùng */}
                            <strong className="text-xl text-gray-700 font-semibold">{userCount}</strong>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                        <IoPieChart className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Posts</span>
                        <div className="flex items-center">
                            {/* Trả về tổng số lượng location*/}
                            <strong className="text-xl text-gray-700 font-semibold">{posts.length * 22}</strong>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
                        <IoCart className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Saved Post</span>
                        <div className="flex items-center">
                            <strong className="text-xl text-gray-700 font-semibold">91</strong>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500">
                        <IoCart className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Chat</span>
                        <div className="flex items-center">
                            <strong className="text-xl text-gray-700 font-semibold">2.7K+</strong>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400">
                        <FaUsers className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Users</span>
                        <div className="flex items-center">
                            {/* Trả về tổng số lượng người dùng */}
                            <strong className="text-xl text-gray-700 font-semibold">{users.length * 10}</strong>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-purple-500">
                        <GrFormView className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Views</span>
                        <div className="flex items-center">
                            {/* Trả về tổng số lượng người dùng */}
                            <strong className="text-xl text-gray-700 font-semibold">13K+</strong>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500">
                        <AiOutlineTransaction className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Transactions</span>
                        <div className="flex items-center">
                            {/* Trả về tổng số lượng người dùng */}
                            <strong className="text-xl text-gray-700 font-semibold">1.7K+</strong>
                        </div>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-pink-500">
                        <AiFillLike className="text-2xl text-white" />
                    </div>
                    <div className="pl-4">
                        <span className="text-sm text-gray-500 font-light">Total Likes</span>
                        <div className="flex items-center">
                            {/* Trả về tổng số lượng người dùng */}
                            <strong className="text-xl text-gray-700 font-semibold">18.7K+</strong>
                        </div>
                    </div>
                </BoxWrapper>
            </div>

            {/* TRANSACTIONS */}
            <div className="h-80 bg-white mx-3  p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
                <strong className="text-gray-700 font-medium">Transactions</strong>
                <div className="mt-3 w-full flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 20,
                                right: 10,
                                left: -10,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Income" fill="#0ea5e9" />
                            <Bar dataKey="Expense" fill="#ea580c" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* PIE CHART */}
            <div className='flex mt-3'>
                <div className="w-80 bg-white mx-3 mt-3 p-4 rounded-sm border border-gray-200 flex flex-col">
                    <strong className="text-gray-700 font-medium">Buyer Profile</strong>
                    <div className="mt-3 w-full flex-1 text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={data2}
                                    cx="50%"
                                    cy="45%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={105}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>



                {/* <div className="w-full bg-white p-4 rounded-sm border border-gray-200">
                    <strong className="text-gray-700 font-medium">Popular Products</strong>
                    <div className="mt-4 flex flex-col gap-3">
                        {popularProducts.map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="flex items-start hover:no-underline"
                            >
                                <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
                                    <img
                                        className="w-full h-full object-cover rounded-sm"
                                        src={product.product_thumbnail}
                                        alt={product.product_name}
                                    />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm text-gray-800">{product.product_name}</p>
                                    <span
                                        className={classNames(
                                            product.product_stock === 0
                                                ? 'text-red-500'
                                                : product.product_stock > 50
                                                    ? 'text-green-500'
                                                    : 'text-orange-500',
                                            'text-xs font-medium'
                                        )}
                                    >
                                        {product.product_stock === 0 ? 'Out of Stock' : product.product_stock + ' in Stock'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 pl-1.5">{product.product_price}</div>
                            </Link>
                        ))}
                    </div>
                </div> */}
                <div className="bg-white px-4 pt-3 mt-3 pb-4 rounded-sm border border-gray-200 ">
                    <strong className="text-gray-700 font-medium">Recent Orders</strong>
                    <div className="border-x border-gray-200 rounded-sm mt-3">
                        <table className="w-full text-gray-700">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product ID</th>
                                    <th>Customer Name</th>
                                    <th>Order Date</th>
                                    <th>Order Total</th>
                                    <th>Shipping Address</th>
                                    <th>Order Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrderData.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="px-4 py-2">
                                            <p>{order.id}</p>
                                        </td>
                                        <td className="px-4 py-2">
                                            <p>#{order.product_id}</p>
                                        </td>
                                        <td className="px-4 py-2">
                                            <p>{order.customer_name}</p>
                                        </td>
                                        <td className="px-4 py-2">
                                            {format(new Date(order.order_date), 'dd MMM yyyy')}
                                        </td>
                                        <td className="px-4 py-2">
                                            <p>{order.order_total}</p>
                                        </td>
                                        <td className="px-4 py-2">
                                            <p>{order.shipment_address}</p>
                                        </td>
                                        <td className="px-4 py-2">
                                            <p>{getOrderStatus(order.current_order_status)}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="w-80 bg-white mx-3 mt-3 rounded-sm border border-gray-200 flex-1 flex-col flex items-center justify-center">
                    <div style={{ width: 200, height: 200, position: 'relative' }}>
                        <CircularProgressbarWithChildren
                            value={data4}
                            strokeWidth={15}
                            styles={buildStyles({
                                pathColor: "#4caf50", // Màu của phần trăm đã đạt được
                                trailColor: "#d6d6d6", // Màu của phần chưa đạt
                            })}
                        >
                            <CircularProgressbarWithChildren
                                value={(doanhThuHienTai / doanhThuCanDat) * 100}
                                strokeWidth={15}
                                styles={buildStyles({
                                    pathColor: "#ff9800", // Màu của doanh thu hiện tại
                                    trailColor: "transparent",
                                    rotation: 0.25, // Đặt vị trí của vòng bên trong
                                })}
                            >
                                <CircularProgressbarWithChildren
                                    value={(doanhThuHienTai / doanhThuCanDat) * 50}
                                    strokeWidth={15}
                                    styles={buildStyles({
                                        pathColor: "#03a9f4", // Màu của vòng trong cùng (thêm vòng thứ 3)
                                        trailColor: "transparent",
                                        rotation: 0.5, // Đặt vị trí vòng
                                    })}
                                >
                                    <div style={{ fontSize: 34, fontWeight: 'bold', textAlign: 'center' }}>
                                        {data4}%
                                    </div>
                                </CircularProgressbarWithChildren>
                            </CircularProgressbarWithChildren>
                        </CircularProgressbarWithChildren>
                    </div>
                    <p className="mt-4 text-center font-semibold">Revenue achieved</p>
                    <p className="text-center text-green-400"><b>Current:</b> {doanhThuHienTai.toLocaleString()} VNĐ</p>
                    <p className="text-center text-red-400"> <b>Target:</b>  {doanhThuCanDat.toLocaleString()} VNĐ</p>
                </div>
            </div>

        </>
    )
}


function BoxWrapper({ children }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}

export default AdminDashBoard