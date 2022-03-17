require('dotenv').config();

const CONFIG = {};
CONFIG.app = process.env.APP || 'dev';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mongo';
CONFIG.db_server = process.env.DB_SERVER || 'localhost';

CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '27017';

CONFIG.db_host_1 = process.env.DB_HOST_1 || 'localhost';
CONFIG.db_port_1 = process.env.DB_PORT_1 || '27017';

CONFIG.db_host_2 = process.env.DB_HOST_2 || 'localhost';
CONFIG.db_port_2 = process.env.DB_PORT_2 || '27018';

CONFIG.db_host_3 = process.env.DB_HOST_3 || 'localhost';
CONFIG.db_port_3 = process.env.DB_PORT_3 || '27019';

CONFIG.replicaSet = process.env.REPLICA_NAME || 'rs0';

CONFIG.db_name = process.env.DB_NAME || 'voucher_db';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || '123';


CONFIG.aws_region = process.env.AWS_REGION || 'us-west-2';
CONFIG.aws_access_key_id = process.env.AWS_ACCESS_KEY_ID || 'xxx';
CONFIG.aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY || 'xxx';

CONFIG.sqs_url = process.env.SQS_URL || 'xxx';

CONFIG.log_path = process.env.LOG_PATH || 'logs';
CONFIG.log_level = process.env.LOG_LEVEL || 'debug';
CONFIG.log_driver = process.env.LOG_DRIVER || 'local';


module.exports = CONFIG;
