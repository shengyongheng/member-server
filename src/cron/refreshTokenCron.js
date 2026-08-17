// src/cron/refreshTokenCron.js
import cron from 'node-cron';
import axios from 'axios';
import pool from '../config/db.js';  // 注意加上 .js 扩展名

// ============ 配置 ============
const CONFIG = {
    clientId: 'YwFaUPosQtCJ',
    clientSecret: 'MDXurGzNJRzdCKrRIgkeKtlL',
    tokenUrl: 'https://open.pingcode.com/v1/auth/token',
};

const TOKEN_ID = 1; // 固定 ID

// ============ 获取令牌并存入数据库 ============
export async function fetchToken() {
    try {
        const response = await axios.get(CONFIG.tokenUrl, {
            params: {
                grant_type: 'client_credentials',
                client_id: CONFIG.clientId,
                client_secret: CONFIG.clientSecret,
            },
        });

        if (response.status === 200 && response.data.access_token) {
            const access_token = response.data.access_token;
            const [result] = await pool.query(
                `INSERT INTO pingcode_token (id, token) VALUES (?, ?)
                 ON DUPLICATE KEY UPDATE token = VALUES(token)`,
                [TOKEN_ID, access_token]
            );
            console.log(`[${new Date().toISOString()}] ✅ 令牌刷新成功 (${result.affectedRows > 0 ? '更新' : '插入'})`);
            return access_token;
        } else {
            throw new Error('响应数据异常');
        }
    } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ 获取令牌失败:`, error.message);
        throw error;
    }
}

// ============ 定时任务注册 ============
// 每天凌晨 02:00 执行
cron.schedule('0 2 * * *', async () => {
    try {
        await fetchToken();
    } catch (error) {
        console.error('定时任务执行失败:', error.message);
    }
});
console.log('⏰ 定时任务已注册（每天 02:00 刷新令牌）');

// 服务启动时获取 token
fetchToken();