import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLoaderData,
} from 'react-router-dom';

const SamplePage = () => {
  const params = useParams();
  const data = useLoaderData();

  return (
    <>
      <p>{JSON.stringify(location.pathname)}</p>
      <p>{JSON.stringify(params)}</p>
      <p>{JSON.stringify(data)}</p>
      <p>
        <Link to="/">home</Link> <Link to="/users/foo">user</Link>
      </p>
      <h1>test</h1>
    </>
  );
};

const apiClient = {
  getData: (_id?: string) => ({ age: 50 } as const),
  updateData: (_formData: FormData, _id?: string) =>
    ({ success: true } as const),
};

const userLoader = async ({ params }) => apiClient.getData(params.id);

const userAction = async ({ params, request }) => {
  const formData = await request.formData();
  return apiClient.updateData(formData, params.id);
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SamplePage />} />
          <Route
            path={'/users/:id'}
            element={<SamplePage />}
            // データ取得
            loader={userLoader}
            // データ更新
            action={userAction}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
