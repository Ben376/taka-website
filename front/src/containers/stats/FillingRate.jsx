import React from 'react';
import { connect } from 'react-redux';
import { VictoryPie, VictoryLabel } from 'victory';
import Grid from '@material-ui/core/Grid';
import './FillingRate.css';

const style = {
  empty: "#bfc0c1",
  half: "#979799",
  full: "#57585a",
}
class FillingRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fillingRate: '',
      metrics: [
        { name: 'avgFillingGlass', value: 0 },
        { name: 'avgFillingPlastic', value: 0 },
        { name: 'avgFillingMetal', value: 0 }

      ]
    };
  }

  componentWillMount() {
    fetch('/api/fillingRate', { headers: { Authorization: 'Bearer ' + this.props.loggedIn.token } })
      .then(res => res.json()).then(json => {
        this.setState({
          fillingRateAtDumping: json.docs,
          metrics: [
            { name: 'Verre', value: json.docs[0].avgFillingGlass },
            { name: 'Plastique', value: json.docs[0].avgFillingPlastic },
            { name: 'Métal', value: json.docs[0].avgFillingMetal },
          ]
        })
      });
  }
  render() {
    return (

      <div style={{padding:'50px'}}className='fillingRate'>

        <h2 style={{fontWeight: 700,color:'#474747'}} variant="headline" gutterbottom="true">
          Taux de remplissage moyen
        </h2>
        <Grid container spacing={24}>
          {this.state.metrics.map((metric, i) => (
            <Grid key={i} item xs={12} sm={4}>
              <svg viewBox="0 0 400 400" width="100%" height="70%">
                <VictoryPie
                  standalone={false}
                  animate={{ duration: 1000 }}
                  colorScale={metric.colorScale}
                  padAngle={0}
                  labelComponent={<span />}
                  innerRadius={70}
                  width={400} height={400}
                  labels={metric.value.toFixed(2)}
                  data={[{ 'key': "", 'y': metric.value }, { 'key': "", 'y': (100 - metric.value) }]}
                  // eslint-disable-next-line
                  colorScale={[metric.value > 90 ? style.full : (metric.value > 30 ? style.half : style.empty), "#eee"]} />
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={200} y={200}
                  text={`${Math.round(metric.value)}%`}
                  style={{ fontSize: 45 }}
                />
              </svg>
              <div className="textpourcent1" x={100} y={100} >{metric.name}
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(FillingRate);
