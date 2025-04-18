const runGA = (populationData, generations = 50, mutationRate = 0.1) => {
    // Khởi tạo quần thể ban đầu
    let population = populationData.map(item => ({
        efficiency: [...item.efficiency],
        proctime: [...item.proctime],
        fitness: calcFitness(item.efficiency)
    }));

    for (let gen = 0; gen < generations; gen++) {
        // Chọn lọc: sắp xếp theo fitness giảm dần
        population.sort((a, b) => b.fitness - a.fitness);

        const elites = population.slice(0, 4); // Giữ lại top 4 cá thể tốt nhất
        const newGeneration = [...elites];

        while (newGeneration.length < population.length) {
            const parent1 = pickRandom(elites);
            const parent2 = pickRandom(elites);

            const child = crossover(parent1, parent2);

            // Đột biến
            if (Math.random() < mutationRate) {
                mutate(child);
            }

            child.fitness = calcFitness(child.efficiency);
            newGeneration.push(child);
        }

        population = newGeneration;
        console.log(`✅ Gen ${gen + 1}/${generations} | 🏅 Best Fitness: ${population[0].fitness.toFixed(2)}`);
    }

    return population[0]; // Trả về cá thể tốt nhất sau tất cả thế hệ
};

// Tính fitness = trung bình efficiency > 0
const calcFitness = (effList) => {
    const valid = effList.filter(e => e > 0);
    if (valid.length === 0) return 0;

    const avg = valid.reduce((sum, val) => sum + val, 0) / valid.length;
    return parseFloat(avg.toFixed(2));
};

// Chọn ngẫu nhiên 1 cá thể từ mảng
const pickRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

// Lai ghép: trộn 1 nửa từ bố và mẹ
const crossover = (p1, p2) => {
    const len = Math.min(p1.efficiency.length, p2.efficiency.length);
    const midpoint = Math.floor(len / 2);

    return {
        efficiency: [
            ...p1.efficiency.slice(0, midpoint),
            ...p2.efficiency.slice(midpoint)
        ],
        proctime: [
            ...p1.proctime.slice(0, midpoint),
            ...p2.proctime.slice(midpoint)
        ],
    };
};

// Đột biến ngẫu nhiên: efficiency và proctime tại 1 điểm
const mutate = (individual) => {
    const idx = Math.floor(Math.random() * individual.efficiency.length);

    // Đột biến efficiency trong khoảng 0–100
    individual.efficiency[idx] = parseFloat((Math.random() * 100).toFixed(2));

    // Đột biến thời gian xử lý nếu có
    if (individual.proctime && individual.proctime[idx] !== undefined) {
        individual.proctime[idx] = parseFloat((Math.random() * 20 + 5).toFixed(2)); // từ 5 đến 25
    }
};

module.exports = { runGA };
