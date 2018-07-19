import React, { Component } from 'react';
import { dataProvider } from "./images/DataProvider";
import {Line as LineChart, Pie} from 'react-chartjs';
import './Analytics.css';
import WordCloud from 'react-d3-cloud';

class Analytics extends Component {
  state = {
    complaints: [],
    perDayData: this.getPerDayComplaints(),
    commonWordsData: this.getCommonWords(),
    vibesData: this.getVibesData()
  };

  setComplaints = (complaints) => {
    const perDayData = this.getPerDayComplaints(complaints);
    const commonWordsData = this.getCommonWords(complaints);
    const vibesData = this.getVibesData(complaints);
    this.setState({ complaints, perDayData: perDayData, commonWordsData: commonWordsData, vibesData: vibesData });
  };

  componentWillMount (){
    dataProvider.get('https://klog-staging.herokuapp.com/api/v1/complaint')
      .then(this.setComplaints)
      .catch(console.error);
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();

    return day + ' ' + monthNames[monthIndex];
  }

  getPerDayComplaints(complaints) {

    let datesHash = {};
    let dates = [];
    let data = [];

    if (complaints != null) {
      for (let i = 0; i < complaints.length; i++) {
        const created_at = new Date(complaints[i].created_at);
        const key = created_at.getDate() + '.' + created_at.getMonth();
        if (datesHash[key] == null) {
          datesHash[key] = 1;
        }
        else {
          datesHash[key]++;
        }
      }
    }

    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      const currIndex = 7-i-1;
      dates[currIndex] = this.formatDate(date);
      const key = date.getDate()+'.'+date.getMonth();

      if (datesHash[key] == null) {
        data[currIndex] = 0;
      }
      else {
        data[currIndex] = datesHash[key];
      }
    }

    const chartData = {
      labels: dates,
      datasets: [
        {
          label: 'Complaints per day',
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: data,
        }
      ]
    };

    const chartOptions = {
      scaleShowGridLines: true,
      scaleGridLineColor: 'rgba(0,0,0,.05)',
      scaleGridLineWidth: 1,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: true,
      bezierCurve: true,
      bezierCurveTension: 0.4,
      pointDot: true,
      pointDotRadius: 4,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
    };

    const styles = {
      graphContainer: {
        border: '1px solid black',
        padding: '15px'
      }
    };

    return {
      chartData: chartData,
      chartOptions: chartOptions,
      styles: styles
    }
  }


  getNoneStopWords(sentence) {
    const common = ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];

    var wordArr = sentence.match(/\w+/g),
      commonObj = {},
      uncommonArr = [],
      word, i;

    for (i = 0; i < common.length; i++) {
      commonObj[ common[i].trim() ] = true;
    }

    for (i = 0; i < wordArr.length; i++) {
      word = wordArr[i].trim().toLowerCase();
      if (!commonObj[word]) {
        uncommonArr.push(word);
      }
    }
    return uncommonArr;
  }

  getCommonWords(complaints) {

    let words = [];
    let wordCount = {};
    let data = [];

    if (complaints != null) {
      for (let i = 0; i < complaints.length; i++) {
        if (complaints[i].text != null) {
          words = words.concat(this.getNoneStopWords(complaints[i].text));
        }
      }
    }

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].toLowerCase();
      if (wordCount[words[i]] == null) {
        wordCount[words[i]] = 1;
      }
      else {
        wordCount[words[i]]++;
      }
    }

    for (let key in wordCount) {
      data.push({text: key, value: wordCount[key] + 2})
    }

    return data;
  }

  getVibesData(complaints) {
    let data = [];

    if (complaints == null) {
      return data;
    }

    let vibesData = {};

    for (let i = 0; i < complaints.length; i++) {
      let currVibe = complaints[i].vibe;
      if (currVibe != null) {
        if (vibesData[currVibe] == null) {
          vibesData[currVibe] = 0;
        }
        vibesData[currVibe]++;
      }
    }

    data = [
      {
        value: vibesData["sad"],
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Sad"
      },
      {
        value: vibesData["happy"],
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Happy"
      },
      {
        value: vibesData["neutral"],
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Neutral"
      }
    ];

    return data;
  }

  render() {

    const fontSizeMapper = word => Math.log2(word.value) * 5;
    const rotate = word => (Math.floor((Math.random() * 20) + 1) - 10) % 360;

    return (
      <div className={'analytics'}>
        <h1 className={'title'}>Complaint Analytics</h1>
        <a href={'/dashboard'} >Go to dashboard</a>
        <h2>Complaints this week</h2>
        <LineChart data={this.state.perDayData.chartData} options={this.state.perDayData.chartOptions} styles={this.state.perDayData.styles} width="300" height="200"/>
        <h2>Most commmon words</h2>
        <WordCloud
          data={this.state.commonWordsData}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
          width={300}
          height={200}
        />
        <h2>Vibes</h2>
        <Pie data={this.state.vibesData}/>
      </div>
    );
  }
}

export default Analytics;
