(() => {
    const start = new Date().getTime(),
        args = processArgs();

    console.info(`Counting from ${args.min} to ${args.max}. Printing Fizz if ` +
        `value is a multiple of ${args.fizz} and Buzz if value is a ` +
        `multiple of ${args.buzz}.`);

    for (let i = args.min; i <= args.max; i++) {
        let out = '';

        if (i % args.fizz === 0) {
            out += 'Fizz';
        }
        if (i % args.buzz === 0) {
            out += 'Buzz';
        }
        if (out === '') {
            out += i;
        }

        console.log(out);
    }

    console.log(`Execution time: ${new Date().getTime() - start}ms`);

    function processArgs() {
        const defaults = {
            min: 1,
            max: 100,
            fizz: 3,
            buzz: 5
        };

        if (process.argv.includes('--help')) {
            console.log(`--min, -n\tValue to start at` +
                `\t\t\t[number] [default: ${defaults.min}]`);
            console.log(`--max, -m\tValue to count to` +
                `\t\t\t[number] [default: ${defaults.max}]`);
            console.log(`--fizz, -f\tMultiples of this value print "Fizz"` +
                `\t[number] [default: ${defaults.fizz}]`);
            console.log(`--buzz, -b\tMultiples of this value pring "Buzz"` +
                `\t[number] [default: ${defaults.buzz}]`);
            console.log(`--help\t\tShow help\t\t\t\t[boolean]`);
            process.exit(0);
        } else {
            let res = defaults;

            for(let idx = 0; idx < process.argv.length; idx++) {
                let arg = process.argv[idx];
                if (arg === '-n' || arg === '--min') {
                    res.min = processArg('min', process.argv[idx + 1],
                        defaults.min);
                    idx++;
                }
                else if (arg === '-m' || arg === '--max') {
                    res.max = processArg('max', process.argv[idx + 1],
                        defaults.max);
                    idx++;
                }
                else if (arg === '-f' || arg === '--fizz') {
                    res.fizz = processArg('fizz', process.argv[idx + 1],
                        defaults.fizz);
                    idx++;
                }
                else if (arg === '-b' || arg === '--buzz') {
                    res.buzz = processArg('buzz', process.argv[idx + 1],
                        defaults.buzz);
                    idx++;
                }
            }

            return res;
        }
    }

    function processArg(argName, arg, def) {
        const res = Number(arg);

        if (res) { return res }
        else {
            console.warn(`${argName} flag specified but unable to ` +
                `parse value, using default value ` +
                `of ${def}.`);
            return def;
        }
    }
})();