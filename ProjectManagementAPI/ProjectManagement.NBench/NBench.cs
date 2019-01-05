using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NBench;
using NBench.Util;
using System.Web.Http;

using ProjectManagement.UnitTest;

namespace ProjectManagement.NBench
{
    public class NBench
    {
        private TasksControllerTest task = new TasksControllerTest();
        private UnitTest.UsersControllerTest user = new UnitTest.UsersControllerTest();
        private ProjectControllerTest project = new ProjectControllerTest();

        private Counter _counter;

        [PerfSetup]
        public void Setup(BenchmarkContext context)
        {
            _counter = context.GetCounter("TestCounter");
        }

        [PerfBenchmark(Description = "Adding a Task",
            NumberOfIterations = 10, RunMode = RunMode.Throughput,
            RunTimeMilliseconds = 10000, TestMode = TestMode.Test)]
        [CounterThroughputAssertion("TestCounter", MustBe.GreaterThan, 10000000.0d)]
        [MemoryAssertion(MemoryMetric.TotalBytesAllocated, MustBe.LessThanOrEqualTo, ByteConstants.ThirtyTwoKb)]
        [GcTotalAssertion(GcMetric.TotalCollections, GcGeneration.Gen2, MustBe.ExactlyEqualTo, 0.0d)]
        public void Benchmark_Add()
        {
            task.AddTask();
        }

        [PerfBenchmark(Description = "Adding user",
           NumberOfIterations = 10, RunMode = RunMode.Throughput,
           RunTimeMilliseconds = 10000, TestMode = TestMode.Test)]
        [CounterThroughputAssertion("TestCounter", MustBe.GreaterThan, 10000000.0d)]
        [MemoryAssertion(MemoryMetric.TotalBytesAllocated, MustBe.LessThanOrEqualTo, ByteConstants.ThirtyTwoKb)]
        [GcTotalAssertion(GcMetric.TotalCollections, GcGeneration.Gen2, MustBe.ExactlyEqualTo, 0.0d)]
        public void Benchmark_AddUser()
        {
            user.AddUser();
        }

        [PerfBenchmark(Description = "Adding project",
          NumberOfIterations = 10, RunMode = RunMode.Throughput,
          RunTimeMilliseconds = 10000, TestMode = TestMode.Test)]
        [CounterThroughputAssertion("TestCounter", MustBe.GreaterThan, 10000000.0d)]
        [MemoryAssertion(MemoryMetric.TotalBytesAllocated, MustBe.LessThanOrEqualTo, ByteConstants.ThirtyTwoKb)]
        [GcTotalAssertion(GcMetric.TotalCollections, GcGeneration.Gen2, MustBe.ExactlyEqualTo, 0.0d)]
        public void Benchmark_Project()
        {
            project.AddProject();
        }

        [PerfBenchmark(Description = "Deleting Task",
            NumberOfIterations = 10, RunMode = RunMode.Throughput,
            RunTimeMilliseconds = 1000, TestMode = TestMode.Test)]
        [CounterThroughputAssertion("TestCounter", MustBe.GreaterThan, 10000000.0d)]
        [MemoryAssertion(MemoryMetric.TotalBytesAllocated, MustBe.LessThanOrEqualTo, ByteConstants.ThirtyTwoKb)]
        [GcTotalAssertion(GcMetric.TotalCollections, GcGeneration.Gen2, MustBe.ExactlyEqualTo, 0.0d)]
        public void Benchmark_Delete()
        {
            task.DeleteTask();
        }

        [PerfBenchmark(Description = "Updating Task",
            NumberOfIterations = 10, RunMode = RunMode.Throughput,
            RunTimeMilliseconds = 1000, TestMode = TestMode.Test)]
        [CounterThroughputAssertion("TestCounter", MustBe.GreaterThan, 10000000.0d)]
        [MemoryAssertion(MemoryMetric.TotalBytesAllocated, MustBe.LessThanOrEqualTo, ByteConstants.ThirtyTwoKb)]
        [GcTotalAssertion(GcMetric.TotalCollections, GcGeneration.Gen2, MustBe.ExactlyEqualTo, 0.0d)]
        public void Benchmark_Update()
        {
            task.UpdateTask();
        }

        [PerfBenchmark(Description = "Updating user",
            NumberOfIterations = 10, RunMode = RunMode.Throughput,
            RunTimeMilliseconds = 1000, TestMode = TestMode.Test)]
        [CounterThroughputAssertion("TestCounter", MustBe.GreaterThan, 10000000.0d)]
        [MemoryAssertion(MemoryMetric.TotalBytesAllocated, MustBe.LessThanOrEqualTo, ByteConstants.ThirtyTwoKb)]
        [GcTotalAssertion(GcMetric.TotalCollections, GcGeneration.Gen2, MustBe.ExactlyEqualTo, 0.0d)]
        public void Benchmark_UpdateUser()
        {
            user.UpdateUser();
        }
        [PerfBenchmark(Description = "Updating project",
            NumberOfIterations = 10, RunMode = RunMode.Throughput,
            RunTimeMilliseconds = 1000, TestMode = TestMode.Test)]
        [CounterThroughputAssertion("TestCounter", MustBe.GreaterThan, 10000000.0d)]
        [MemoryAssertion(MemoryMetric.TotalBytesAllocated, MustBe.LessThanOrEqualTo, ByteConstants.ThirtyTwoKb)]
        [GcTotalAssertion(GcMetric.TotalCollections, GcGeneration.Gen2, MustBe.ExactlyEqualTo, 0.0d)]
        public void Benchmark_UpdateProject()
        {
            project.UpdateProject();
        }

        [PerfCleanup]
        public void Cleanup()
        {
            // does nothing
        }
    }
}
