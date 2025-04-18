const express = require('express');
const router = express.Router();
const Training = require('../../models/training.model');

// PUT /api/training
const trainingBatch = async (req, res) => {
    try {
        const { efficiencies, proctimes } = req.query;

        if (!efficiencies || !proctimes) {
            return res.status(400).json({ message: 'Missing "efficiencies" or "proctimes" in query' });
        }

        console.log("Received efficiencies (raw):", efficiencies);
        console.log("Received proctimes (raw):", proctimes);

        let parsedEff, parsedProc;
        try {
            parsedEff = JSON.parse(efficiencies);
            parsedProc = JSON.parse(proctimes);
        } catch (err) {
            return res.status(400).json({ message: 'Invalid JSON format for efficiencies or proctimes' });
        }

        if (!Array.isArray(parsedEff) || !Array.isArray(parsedProc)) {
            return res.status(400).json({ message: 'Both efficiencies and proctimes must be arrays' });
        }

        // Làm tròn hiệu suất về phần trăm
        const formattedEff = parsedEff.map(val => parseFloat((val * 100).toFixed(2)));

        // Làm tròn thời gian xử lý
        const formattedProc = parsedProc.map(val => parseFloat(val.toFixed(2)));

        console.log("Formatted efficiencies:", formattedEff);
        console.log("Formatted proctimes:", formattedProc);

        // Lưu vào DB
        const result = await Training.create({
            Efficiency: JSON.stringify(formattedEff),
            ProcTime: JSON.stringify(formattedProc)
        });

        return res.status(200).json({ message: 'Saved successfully', data: result });
    } catch (error) {
        console.error('Error saving batch training data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getBestEfficiency = async (req, res) => {
    try {
        // 1. Lấy tất cả bản ghi từ bảng Training
        const all = await Training.findAll();

        if (!all.length) {
            return res.status(404).json({ message: 'No efficiency data found' });
        }

        let bestAverage = -Infinity;
        let bestRecord = null;

        // 2. Duyệt qua từng bản ghi
        for (const record of all) {
            const effStr = record.Efficiency;
            const procStr = record.ProcTime;

            if (!effStr || !procStr) continue;

            let efficiencies = [];
            let proctimes = [];

            try {
                efficiencies = JSON.parse(effStr);
                proctimes = JSON.parse(procStr);
            } catch (e) {
                console.warn('Invalid JSON in record ID:', record.id);
                continue;
            }

            // 3. Lọc ra giá trị > 0 để tính trung bình (bỏ máy chết)
            const validEffs = efficiencies.filter(e => e > 0);
            if (validEffs.length === 0) continue;

            const sum = validEffs.reduce((a, b) => a + b, 0);
            const avg = sum / validEffs.length;

            // 4. Nếu là bộ có hiệu suất TB cao nhất thì lưu lại
            if (avg > bestAverage) {
                bestAverage = avg;
                bestRecord = {
                    id: record.id,
                    avgEfficiency: parseFloat(avg.toFixed(2)),
                    efficiencyList: efficiencies,
                    proctimeList: proctimes
                };
            }
        }

        if (!bestRecord) {
            return res.status(404).json({ message: 'No valid efficiency data found' });
        }

        // ✅ Trả kết quả bộ tối ưu
        return res.status(200).json({ message: 'Best efficiency record', data: bestRecord });

    } catch (err) {
        console.error('Error finding best efficiency:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { trainingBatch, getBestEfficiency };
