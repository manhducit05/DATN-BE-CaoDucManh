const { runGA } = require("../utils/genetic");
const Training = require("../../models/training.model"); // Import model Training

const runGAHandler = async (req, res) => {
    try {
        // Lấy toàn bộ dữ liệu từ bảng 'training'
        const trainingRecords = await Training.findAll();

        // Chuyển đổi dữ liệu từ DB về dạng populationData của GA
        const populationData = trainingRecords.map(record => {
            let efficiency, proctime;
            // Giả sử trường Efficiency và ProcTime lưu dưới dạng JSON string. Nếu không, thay đổi logic parse
            try {
                efficiency = JSON.parse(record.Efficiency);
                proctime = JSON.parse(record.ProcTime);
            } catch (err) {
                // Nếu không thể parse JSON, có thể là chuỗi được phân tách bởi dấu phẩy
                efficiency = record.Efficiency.split(',').map(str => parseFloat(str));
                proctime = record.ProcTime.split(',').map(str => parseFloat(str));
            }
            return { efficiency, proctime };
        });

        // Lấy các tham số từ query string nếu có, hoặc dùng giá trị mặc định
        const generations = req.query.generations ? parseInt(req.query.generations, 10) : 50;
        const mutationRate = req.query.mutationRate ? parseFloat(req.query.mutationRate) : 0.1;

        // Chạy thuật toán di truyền với dữ liệu lấy từ DB
        const bestIndividual = runGA(populationData, generations, mutationRate);

        res.json({
            message: "✅ Genetic Algorithm run successfully",
            bestIndividual
        });
    } catch (error) {
        console.error("Error in runGAHandler:", error);
        res.status(500).json({
            message: "Error retrieving training data from database",
            error: error.message
        });
    }
};

module.exports = {
    runGA: runGAHandler
};
