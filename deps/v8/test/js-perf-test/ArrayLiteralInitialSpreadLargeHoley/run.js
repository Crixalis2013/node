// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Comparing different copy schemes against spread initial literals.
// Benchmarks for large holey arrays.

const largeHoleyArray = new Array(100000);

for (var i = 0; i < 100; i++) {
  largeHoleyArray[i] = i;
}

for (var i = 5000; i < 5500; i++) {
  largeHoleyArray[i] = i;
}

// ----------------------------------------------------------------------------
// Benchmark: Spread
// ----------------------------------------------------------------------------

function SpreadLargeHoley() {
  var newArr = [...largeHoleyArray];
  // basic sanity check
  if (newArr.length != largeHoleyArray.length) throw 666;
  return newArr;
}

// ----------------------------------------------------------------------------
// Benchmark: ForLength
// ----------------------------------------------------------------------------

function ForLengthLargeHoley() {
  var newArr = new Array(largeHoleyArray.length);
  for (let i = 0; i < largeHoleyArray.length; i++) {
    newArr[i] = largeHoleyArray[i];
  }
  // basic sanity check
  if (newArr.length != largeHoleyArray.length) throw 666;
  return newArr;
}

// ----------------------------------------------------------------------------
// Benchmark: ForLengthEmpty
// ----------------------------------------------------------------------------

function ForLengthEmptyLargeHoley() {
  var newArr = [];
  for (let i = 0; i < largeHoleyArray.length; i++) {
    newArr[i] = largeHoleyArray[i];
  }
  // basic sanity check
  if (newArr.length != largeHoleyArray.length) throw 666;
  return newArr;
}

// ----------------------------------------------------------------------------
// Benchmark: Slice
// ----------------------------------------------------------------------------

function SliceLargeHoley() {
  var newArr = largeHoleyArray.slice();
  // basic sanity check
  if (newArr.length != largeHoleyArray.length) throw 666;
  return newArr;
}

// ----------------------------------------------------------------------------
// Benchmark: Slice0
// ----------------------------------------------------------------------------

function Slice0LargeHoley() {
  var newArr = largeHoleyArray.slice(0);
  // basic sanity check
  if (newArr.length != largeHoleyArray.length) throw 666;
  return newArr;
}

// ----------------------------------------------------------------------------
// Benchmark: ConcatReceive
// ----------------------------------------------------------------------------

function ConcatReceiveLargeHoley() {
  var newArr = largeHoleyArray.concat();
  // basic sanity check
  if (newArr.length != largeHoleyArray.length) throw 666;
  return newArr;
}

// ----------------------------------------------------------------------------
// Benchmark: ConcatArg
// ----------------------------------------------------------------------------

function ConcatArgLargeHoley() {
  var newArr = [].concat(largeHoleyArray);
  // basic sanity check
  if (newArr.length != largeHoleyArray.length) throw 666;
  return newArr;
}

// ----------------------------------------------------------------------------
// Benchmark: ForOfPush
// ----------------------------------------------------------------------------

function ForOfPushLargeHoley() {
  var newArr = [];
  for (let x of largeHoleyArray) {
    newArr.push(x)
  }
  // basic sanity check
  if (newArr.length != largeHoleyArray.length) throw 666;
  return newArr;
}

// ----------------------------------------------------------------------------
// Benchmark: MapId
// ----------------------------------------------------------------------------

function MapIdLargeHoley() {
  var newArr = largeHoleyArray.map(x => x);
  // basic sanity check
  if (newArr.length != largeHoleyArray.length) throw 666;
  return newArr;
}

// ----------------------------------------------------------------------------
// Setup and Run
// ----------------------------------------------------------------------------

load('../base.js');

var success = true;

function PrintResult(name, result) {
  print(name + '-ArrayLiteralInitialSpreadLargeHoley(Score): ' + result);
}

function PrintError(name, error) {
  PrintResult('Error: ' + name, error);
  success = false;
}

// Run the benchmark (20 x 100) iterations instead of 1 second.
function CreateBenchmark(name, f) {
  new BenchmarkSuite(name, [1000], [ new Benchmark(name, false, false, 20, f) ]);
}

CreateBenchmark('Spread', SpreadLargeHoley);
CreateBenchmark('ForLength', ForLengthLargeHoley);
CreateBenchmark('ForLengthEmpty', ForLengthEmptyLargeHoley);
CreateBenchmark('Slice', SliceLargeHoley);
CreateBenchmark('Slice0', Slice0LargeHoley);
CreateBenchmark('ConcatReceive', ConcatReceiveLargeHoley);
CreateBenchmark('ConcatArg', ConcatArgLargeHoley);
CreateBenchmark('ForOfPush', ForOfPushLargeHoley);
CreateBenchmark('MapId', MapIdLargeHoley);


BenchmarkSuite.config.doWarmup = true;
BenchmarkSuite.config.doDeterministic = true;
BenchmarkSuite.RunSuites({NotifyResult: PrintResult, NotifyError: PrintError});
