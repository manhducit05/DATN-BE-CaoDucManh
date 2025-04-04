const GeneticAlgorithm = require("geneticalgorithm");

const executionGA = async (req, res) => {
    const machines = [
        { name: "Máy 1", processed: 500 },
        { name: "Máy 2", processed: 300 },
        { name: "Máy 3", processed: 200 }
    ];

    const simTime = 1000; // Tổng thời gian mô phỏng (giây)
    const expectedRate = 2.0; // Mục tiêu: số sản phẩm mỗi giây

    const ga = GeneticAlgorithm({
        mutationFunction: (entity) => {
            return entity.map(x => Math.max(50, x + (Math.random() - 0.5) * 20));
        },
        crossoverFunction: (parent1, parent2) => {
            let child1 = parent1.map((x, i) => (x + parent2[i]) / 2);
            let child2 = parent2.map((x, i) => (x * 0.7 + parent1[i] * 0.3));
            return [child1, child2];
        },
        fitnessFunction: (entity) => {
            let totalProcessed = entity.reduce((sum, x) => sum + (x / simTime), 0);
            return -Math.abs(totalProcessed - expectedRate);
        },
        population: Array.from({ length: 100 }, () => machines.map(m => m.processed))
    });

    for (let i = 0; i < 100; i++) {
        ga.evolve();
    }

    const bestSolution = ga.best();
    console.log("🔹 Kết quả tối ưu:", bestSolution);

    return res.json({
        message: "Kết quả tối ưu của thuật toán GA",
        bestSolution
    });
};

module.exports = { executionGA };