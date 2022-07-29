import Sidebar from "../../../Components/Admin/sidebar/Sidebar";
import Widget from "../../../Components/Admin/widget/Widget";
import Featured from "../../../Components/Admin/featured/Featured";
import Chart from "../../../Components/Admin/chart/Chart";
// import Table from "../../../Components/Admin/table/Table";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
