import { connect } from 'mongoose';
import { MONGODB_URI } from './config';

const database = connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false })

export default database;