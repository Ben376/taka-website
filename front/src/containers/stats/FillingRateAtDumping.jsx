import React from 'react';
import { connect } from 'react-redux';
import { VictoryPie, VictoryLabel } from 'victory';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const style = {
  empty: "#40e8d4",
  half: "#19B3A6",
  full: "#0c8c7f",
}
class FillingRateAtDumping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fillingRateAtDumping: '',
      metrics: [
        { name: 'glass_at_dumping', value: 0 },
        { name: 'plastic_at_dumping', value: 0 },
        { name: 'metal_at_dumping', value: 0 }

      ]
    };
  }

  componentWillMount() {
    fetch('/api/fillingRateAtDumping', {headers: {Authorization: 'Bearer ' + this.props.loggedIn.token}})
    .then(res => res.json()).then(json => {
      this.setState({
        fillingRateAtDumping: json.docs,
        metrics: [
          { name: 'Verre', value: json.docs[0].glass_at_dumping },
          { name: 'Plastique', value: json.docs[0].plastic_at_dumping },
          { name: 'Métal', value: json.docs[0].metal_at_dumping },
        ]
      })
    });
  }
  render() {
    return (

      <div style={{padding:'50px'}}className='fillingRateAtDumping'>

        <Typography style={{fontWeight: 700,color:'#474747'}} variant="headline" gutterBottom>
        Taux de remplissage moyen au vidage de la poubelle
        </Typography>
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
                  colorScale={[metric.value > 90?style.full:(metric.value > 30?style.half:style.empty)
                    , "#eee"]}
                                  />
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={200} y={200}
                  text={`${Math.round(metric.value)}%`}
                  style={{ fontSize: 45 }}
                />
              </svg>
              <div className="textpourcent2" x={100} y={100} >{metric.name}
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
export default connect(mapStateToProps)(FillingRateAtDumping)
