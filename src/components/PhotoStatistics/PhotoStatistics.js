import React, { Component } from "react";
import PropTypes from "prop-types";
import { Line, Pie } from "react-chartjs-2";
import "./PhotoStatistics.css";

export default class PhotoStatistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoStatistics: {},
      chartInfo: {},
      dates: [],
      views: [],
      likes: [],
      downloads: []
    };
  }

  componentDidMount() {
    this.getPhotoStatistics();
  }

  getPhotoStatistics = () => {
    const { photoId } = this.props;

    fetch(
      `https://api.unsplash.com/photos/${photoId}/statistics?client_id=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ photoStatistics: data });

        const dates = [];
        const views = [];
        const likes = [];
        const downloads = [];
        this.state.photoStatistics.views.historical.values.forEach(element => {
          const info = element;
          dates.push(info.date);

          views.push(info.value);

          this.setState({ dates: dates, views: views });
        });

        this.state.photoStatistics.likes.historical.values.forEach(element => {
          const info = element;

          likes.push(info.value);

          this.setState({ likes: likes });
        });

        this.state.photoStatistics.downloads.historical.values.forEach(
          element => {
            const info = element;

            downloads.push(info.value);

            this.setState({ downloads: downloads });
          }
        );
      })
      .catch(err => console.log(err));
  };

  datasetKeyProvider = () => {
    return Math.random();
  };

  render() {
    const { photoStatistics, views, likes, downloads } = this.state;

    const lineChartData = {
      labels: [...this.state.dates],
      datasets: [
        {
          label: "Views",
          fill: false,
          lineTension: 1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 5,
          pointRadius: 5,
          pointHitRadius: 10,
          showLine: true,
          data: [...views]
        },

        {
          label: "Likes",
          fill: false,
          lineTension: 1,
          backgroundColor: "rgba(75,70,190,0.4)",
          borderColor: "rgba(71,100,140,1)",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 5,
          pointRadius: 5,
          pointHitRadius: 10,
          showLine: true,
          data: [...likes]
        },

        {
          label: "Downloads",
          fill: false,
          lineTension: 1,
          backgroundColor: "rgba(75,70,190,0.4)",
          borderColor: "rgba(71,100,140,1)",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 5,
          pointRadius: 5,
          pointHitRadius: 10,
          showLine: true,
          data: [...downloads]
        }
      ]
    };

    const pieChartData = {
      labels: ["Views", "Likes", "Downloads"],
      datasets: [
        {
          data: [
            photoStatistics.downloads && photoStatistics.downloads.total,
            photoStatistics.likes && photoStatistics.likes.total,
            photoStatistics.downloads && photoStatistics.downloads.total
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };

    return (
      <div>
        <h1 className="photo-stats-title">Photo Statistics</h1>
        <div className="charts">
          <div className="chart-container">
            <Line
              datasetKeyProvider={lineChartData.datasets.label}
              width={100}
              height={50}
              options={{
                legend: {
                  display: true,
                  position: "bottom"
                },
                maintainAspectRatio: false,

                scales: {
                  xAxes: [
                    {
                      type: "time",
                      time: {
                        unit: "day"
                      }
                    }
                  ]
                }
              }}
              data={lineChartData}
            />

            <Pie
              datasetKeyProvider={this.datasetKeyProvider}
              data={pieChartData}
              width={100}
              height={50}
              options={{
                legend: {
                  display: true,
                  position: "bottom"
                },
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

PhotoStatistics.propTypes = {
  photoId: PropTypes.string
};
