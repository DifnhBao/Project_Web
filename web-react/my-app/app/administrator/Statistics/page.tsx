export default function Statistics() {
  return (
    <div id="stats" className="section">
      <div className="stats-container">
        <div className="S-cards">
          <div className="S-card">
            <h3>Total Users</h3>
            <p className="big-number">1.500.000</p>
            <span className="growth">+15% this month</span>
          </div>

          <div className="S-card">
            <h3>Total Songs</h3>
            <p className="big-number">60.100</p>
            <span className="growth">+5.320 uploaded</span>
          </div>

          <div className="S-card">
            <h3>Total plays</h3>
            <p className="big-number">81.201.583</p>
            <span className="growth">+20% this month</span>
          </div>
        </div>

        <div className="S-charts">
          <div className="chart-box">
            <h3>Daily Plays Last 30 Days</h3>
            <canvas id="S-lineChart"></canvas>
          </div>
          <div className="chart-box">
            <h3>Gneres Popularity</h3>
            <canvas id="circleChart"></canvas>
          </div>
        </div>
      </div>

      <div className="table-box">
        <h3>Top 5 most played songs</h3>
        <table>
          <thead>
            <tr>
              <th>Song title</th>
              <th>Artist</th>
              <th>Played</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Phép Màu</td>
              <td>MAYDAYS</td>
              <td>3.200.180</td>
            </tr>
            <tr>
              <td>Kho Báu</td>
              <td>Rhymastic</td>
              <td>3.000.019</td>
            </tr>
            <tr>
              <td>Còn Gì Đẹp Hơn(Mưa Đỏ)</td>
              <td>Nguyễn Hùng</td>
              <td>2,907.100</td>
            </tr>
            <tr>
              <td>Mất Kết Nối</td>
              <td>Dương Domic</td>
              <td>2.539.112</td>
            </tr>
            <tr>
              <td>Nỗi Đau Giữa Hòa Bình</td>
              <td>Hòa Minzy x Nguyễn Văn Chung</td>
              <td>2.341.901</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
