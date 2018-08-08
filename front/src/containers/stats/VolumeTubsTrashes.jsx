import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SortingDate from './SortingDate';
import { getVolumeTubsTrashes } from '../../actions/index';
import CardVolumeTrash from '../../components/stats/CardVolumeTrash.jsx';

import bottle from '../../images/volumeTubsTrashes/bottle.svg';
import conserve from '../../images/volumeTubsTrashes/conserve.svg';
import plastic from '../../images/volumeTubsTrashes/plastic.svg';


class VolumeTubsTrashes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: [bottle, conserve, plastic],
        }
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={12} sm={3}>
                    <SortingDate style={{ width: 50, paddingBottom: 10 }} action={this.props.getVolumeTubsTrashes} />
                </Grid>

                <Grid style={{ padding:'10px'}} item xs={12} sm={9}>



                    {
                        this.props.data.docs && this.props.data.docs.length > 0
                            ?
                            <Grid container spacing={24} >
                                {[this.props.data.docs[0].totalAmountGlass, this.props.data.docs[0].totalAmountMetal, this.props.data.docs[0].totalAmountPlastic].map((x, i) =>
                                    <Grid
                                        key={i}
                                        item className="volume-card"
                                        xs={12} sm={4}>
                                        <CardVolumeTrash
                                            imaged={this.state.image[i]}
                                            data={x.toLocaleString()}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            :
                            <Grid container spacing={24} >
                                {[0, 1, 2].map((x, i) =>
                                    <Grid
                                        key={i}
                                        item className="volume-card"
                                        xs={12} sm={4}>
                                        <CardVolumeTrash
                                            imaged={this.state.image[i]}
                                            data={0}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                    }
                </Grid>
            </Grid>
        );
    }

}

const mapStateToProps = state => {
    return {
        data: state.statsVolumeTubsTrashes,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getVolumeTubsTrashes }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(VolumeTubsTrashes);
